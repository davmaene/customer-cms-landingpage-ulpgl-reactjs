import React, { useState } from "react";
import { useData } from "../../contexts/DataContext";
import { DashboardModal } from "../../components/dashboard/DashboardModal";
import { ConfirmDialog } from "../../components/dashboard/ConfirmDialog";
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiMail, FiPhone } from "react-icons/fi";

const FiPlusIcon = FiPlus as any;
const FiEdit2Icon = FiEdit2 as any;
const FiTrash2Icon = FiTrash2 as any;
const FiSearchIcon = FiSearch as any;
const FiMailIcon = FiMail as any;
const FiPhoneIcon = FiPhone as any;

interface StaffFormData {
  name: string;
  slug: string;
  role: string;
  email: string;
  phone: string;
  description: string;
  isOrganizer: boolean;
}

const emptyForm: StaffFormData = {
  name: "", slug: "", role: "", email: "", phone: "", description: "", isOrganizer: false,
};

export const DashboardStaff: React.FC = () => {
  const { staffMembers, addStaffMember, updateStaffMember, deleteStaffMember } = useData();
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<StaffMember | null>(null);
  const [formData, setFormData] = useState<StaffFormData>(emptyForm);
  const [confirmDelete, setConfirmDelete] = useState<string | number | null>(null);

  const filtered = staffMembers.filter((member) =>
    member.name.toLowerCase().includes(search.toLowerCase()) ||
    member.role.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => {
    setEditingMember(null);
    setFormData(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (member: StaffMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      slug: member.slug,
      role: member.role,
      email: member.email?.join(", ") || "",
      phone: member.phone?.join(", ") || "",
      description: member.description || "",
      isOrganizer: member.isOrganizer || false,
    });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const memberData = {
      name: formData.name,
      slug,
      role: formData.role,
      email: formData.email ? formData.email.split(",").map((e) => e.trim()).filter(Boolean) : undefined,
      phone: formData.phone ? formData.phone.split(",").map((p) => p.trim()).filter(Boolean) : undefined,
      description: formData.description || undefined,
      isOrganizer: formData.isOrganizer,
    };
    if (editingMember) {
      updateStaffMember(editingMember.uuid, memberData);
    } else {
      addStaffMember(memberData as Omit<StaffMember, "uuid">);
    }
    setModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (confirmDelete !== null) {
      deleteStaffMember(confirmDelete);
      setConfirmDelete(null);
    }
  };

  return (
    <div>
      <div className="dash-page-header">
        <div>
          <h4 className="dash-page-title">Gestion du Personnel</h4>
          <p className="dash-page-subtitle">{staffMembers.length} membres au total</p>
        </div>
        <button className="btn btn-primary dash-btn-add" onClick={openCreate}>
          <FiPlusIcon size={18} />
          <span>Nouveau membre</span>
        </button>
      </div>

      <div className="dashboard-card dash-filter-bar">
        <div className="dash-search-wrapper">
          <FiSearchIcon size={18} className="dash-search-icon" />
          <input
            type="text"
            className="form-control dash-search-input"
            placeholder="Rechercher par nom ou rôle..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="dashboard-staff-grid">
        {filtered.length === 0 ? (
          <div className="dashboard-card text-center text-muted py-4">
            Aucun membre trouvé
          </div>
        ) : (
          filtered.map((member, idx) => (
            <div key={member.uuid + "-" + idx} className="dashboard-card dashboard-staff-card">
              <div className="dash-staff-card-actions">
                <button className="dash-action-btn dash-action-edit" onClick={() => openEdit(member)} title="Modifier">
                  <FiEdit2Icon size={14} />
                </button>
                <button className="dash-action-btn dash-action-delete" onClick={() => setConfirmDelete(member.uuid)} title="Supprimer">
                  <FiTrash2Icon size={14} />
                </button>
              </div>
              <div className="d-flex align-items-start gap-3">
                {member.image ? (
                  <img src={member.image} alt={member.name} className="dashboard-staff-avatar" />
                ) : (
                  <div className="dashboard-staff-avatar-placeholder">
                    {member.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                )}
                <div className="flex-grow-1">
                  <h6 className="mb-1">{member.name}</h6>
                  <span className="badge bg-primary bg-opacity-10 text-primary mb-2">
                    {member.role}
                  </span>
                  {member.description && (
                    <p className="text-muted small mb-2">{member.description}</p>
                  )}
                  <div className="d-flex flex-column gap-1">
                    {member.email?.map((email, i) => (
                      <small key={i} className="text-muted d-flex align-items-center gap-1">
                        <FiMailIcon size={12} /> {email}
                      </small>
                    ))}
                    {member.phone?.map((phone, i) => (
                      <small key={i} className="text-muted d-flex align-items-center gap-1">
                        <FiPhoneIcon size={12} /> {phone}
                      </small>
                    ))}
                  </div>
                  {member.isOrganizer && (
                    <span className="badge bg-warning bg-opacity-10 text-warning mt-2">
                      Organisateur
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <DashboardModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingMember ? "Modifier le membre" : "Nouveau membre"}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nom complet</label>
            <input type="text" className="form-control" value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Rôle / Fonction</label>
            <input type="text" className="form-control" value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email(s) <small className="text-muted">(séparés par des virgules)</small></label>
            <input type="text" className="form-control" value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          </div>
          <div className="mb-3">
            <label className="form-label">Téléphone(s) <small className="text-muted">(séparés par des virgules)</small></label>
            <input type="text" className="form-control" value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea className="form-control" rows={2} value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="isOrganizer"
              checked={formData.isOrganizer}
              onChange={(e) => setFormData({ ...formData, isOrganizer: e.target.checked })} />
            <label className="form-check-label" htmlFor="isOrganizer">Membre organisateur</label>
          </div>
          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-outline-secondary" onClick={() => setModalOpen(false)}>Annuler</button>
            <button type="submit" className="btn btn-primary">{editingMember ? "Enregistrer" : "Ajouter"}</button>
          </div>
        </form>
      </DashboardModal>

      <ConfirmDialog
        isOpen={confirmDelete !== null}
        onClose={() => setConfirmDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Supprimer le membre"
        message="Êtes-vous sûr de vouloir supprimer ce membre du personnel ?"
      />
    </div>
  );
};
