const express = require('express');
const slugify = require('slugify');
const { Center, Faculty, User, serializeCenter, deserializeCenter } = require('../models');
const { requireAuth, requireRole } = require('../middleware/auth');

const router = express.Router();

const includes = [
  { model: Faculty, as: 'faculty', attributes: ['id', 'name', 'slug'] },
  { model: User, as: 'author', attributes: ['id', 'name', 'email'] },
];

const mapItems = (rows) => rows.map((r) => deserializeCenter(r));

router.get('/', async (req, res) => {
  const where = { status: 'published' };
  if (req.query.facultyId) where.facultyId = req.query.facultyId;
  const items = await Center.findAll({ where, include: includes, order: [['title', 'ASC']] });
  res.json({ length: items.length, rows: mapItems(items) });
});

router.get('/slug/:slug', async (req, res) => {
  const item = await Center.findOne({ where: { slug: req.params.slug, status: 'published' }, include: includes });
  if (!item) return res.status(404).json({ message: 'Centre introuvable' });
  res.json({ item: deserializeCenter(item) });
});

router.get('/admin', requireAuth, async (req, res) => {
  const where = {};
  if (req.query.status) where.status = req.query.status;
  if (req.user.role === 'faculty_publisher') where.authorId = req.user.id;
  const items = await Center.findAll({ where, include: includes, order: [['createdAt', 'DESC']] });
  res.json({ rows: mapItems(items) });
});

router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, description, profile, coverImage, images, direction,
      domaineInterventions, etudesRealisees, partenaires, contacts, facultyId } = req.body;
    if (!title?.trim() || !description?.trim()) return res.status(400).json({ message: 'Titre et description requis' });

    let slug = slugify(title, { lower: true, strict: true });
    const existing = await Center.findOne({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now()}`;

    const status = req.user.role === 'super_admin' ? 'published' : 'pending';
    const publishedAt = status === 'published' ? new Date() : null;

    const payload = serializeCenter({
      slug, title, description, profile, coverImage,
      images: Array.isArray(images) ? images : [],
      direction: direction || null,
      domaineInterventions: Array.isArray(domaineInterventions) ? domaineInterventions : [],
      etudesRealisees: Array.isArray(etudesRealisees) ? etudesRealisees : [],
      partenaires: Array.isArray(partenaires) ? partenaires : [],
      contacts: Array.isArray(contacts) ? contacts : [],
      facultyId: req.user.role === 'faculty_publisher' ? req.user.facultyId : (facultyId || null),
      authorId: req.user.id, status, publishedAt,
    });
    const item = await Center.create(payload);
    res.status(201).json({ item: deserializeCenter(item) });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.put('/:id', requireAuth, async (req, res) => {
  const item = await Center.findByPk(req.params.id);
  if (!item) return res.status(404).json({ message: 'Introuvable' });
  if (req.user.role !== 'super_admin' && item.authorId !== req.user.id)
    return res.status(403).json({ message: 'Accès refusé' });

  const scalarFields = ['title', 'description', 'profile', 'coverImage'];
  scalarFields.forEach((f) => { if (req.body[f] !== undefined) item[f] = req.body[f]; });
  const jsonInputs = ['images', 'direction', 'domaineInterventions', 'etudesRealisees', 'partenaires', 'contacts'];
  jsonInputs.forEach((f) => { if (req.body[f] !== undefined) item[f] = JSON.stringify(req.body[f]); });
  if (req.body.title) {
    item.slug = slugify(req.body.title, { lower: true, strict: true }) + '-' + item.id;
  }
  if (req.user.role === 'faculty_publisher') {
    item.status = 'pending';
    item.publishedAt = null;
  }
  await item.save();
  res.json({ item: deserializeCenter(item) });
});

router.post('/:id/approve', requireAuth, requireRole('super_admin'), async (req, res) => {
  const item = await Center.findByPk(req.params.id);
  if (!item) return res.status(404).json({ message: 'Introuvable' });
  item.status = 'published'; item.publishedAt = new Date(); item.rejectionReason = null;
  await item.save();
  res.json({ item: deserializeCenter(item) });
});

router.post('/:id/reject', requireAuth, requireRole('super_admin'), async (req, res) => {
  const item = await Center.findByPk(req.params.id);
  if (!item) return res.status(404).json({ message: 'Introuvable' });
  item.status = 'rejected'; item.rejectionReason = req.body.reason || 'Refusé';
  await item.save();
  res.json({ item: deserializeCenter(item) });
});

router.delete('/:id', requireAuth, async (req, res) => {
  const item = await Center.findByPk(req.params.id);
  if (!item) return res.status(404).json({ message: 'Introuvable' });
  if (req.user.role !== 'super_admin' && item.authorId !== req.user.id)
    return res.status(403).json({ message: 'Accès refusé' });
  await item.destroy();
  res.json({ ok: true });
});

module.exports = router;
