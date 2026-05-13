import React, { useState } from "react";
import { useData } from "../../contexts/DataContext";
import { truncateText } from "../../utils/utils.fucntions";
import { DashboardModal } from "../../components/dashboard/DashboardModal";
import { ConfirmDialog } from "../../components/dashboard/ConfirmDialog";
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";

const FiPlusIcon = FiPlus as any;
const FiEdit2Icon = FiEdit2 as any;
const FiTrash2Icon = FiTrash2 as any;
const FiSearchIcon = FiSearch as any;

const emptyPost: Omit<Post, "id"> = {
  post_title: "",
  post_author: "Admin",
  post_date: new Date().toISOString().split("T")[0],
  post_content: "",
  post_excerpt: "",
  post_category: "",
  post_status: "publish",
  post_name: "",
  comment_count: 0,
};

export const DashboardArticles: React.FC = () => {
  const { posts, addPost, updatePost, deletePost } = useData();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState<Omit<Post, "id">>(emptyPost);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const categories = Array.from(new Set(posts.map((p) => p.post_category).filter(Boolean)));

  const filtered = posts.filter((post) => {
    const matchSearch =
      post.post_title.toLowerCase().includes(search.toLowerCase()) ||
      post.post_author.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !categoryFilter || post.post_category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const openCreate = () => {
    setEditingPost(null);
    setFormData({ ...emptyPost, post_date: new Date().toISOString().split("T")[0] });
    setModalOpen(true);
  };

  const openEdit = (post: Post) => {
    setEditingPost(post);
    setFormData({ ...post });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formData.post_title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    if (editingPost) {
      updatePost(editingPost.id, { ...formData, post_name: slug });
    } else {
      addPost({ ...formData, post_name: slug });
    }
    setModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (confirmDelete !== null) {
      deletePost(confirmDelete);
      setConfirmDelete(null);
    }
  };

  return (
    <div>
      <div className="dash-page-header">
        <div>
          <h4 className="dash-page-title">Gestion des Articles</h4>
          <p className="dash-page-subtitle">{posts.length} articles au total</p>
        </div>
        <button className="btn btn-primary dash-btn-add" onClick={openCreate}>
          <FiPlusIcon size={18} />
          <span>Nouvel article</span>
        </button>
      </div>

      <div className="dashboard-card dash-filter-bar">
        <div className="dash-search-wrapper">
          <FiSearchIcon size={18} className="dash-search-icon" />
          <input
            type="text"
            className="form-control dash-search-input"
            placeholder="Rechercher par titre ou auteur..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="form-select dash-filter-select"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">Toutes les catégories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="dashboard-card">
        <div className="table-responsive">
          <table className="table table-hover dashboard-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Titre</th>
                <th>Auteur</th>
                <th>Catégorie</th>
                <th>Date</th>
                <th>Statut</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-muted py-4">
                    Aucun article trouvé
                  </td>
                </tr>
              ) : (
                filtered.map((post, idx) => (
                  <tr key={post.id + "-" + idx}>
                    <td className="text-muted">{post.id}</td>
                    <td className="fw-medium">{truncateText(post.post_title, 45)}</td>
                    <td className="text-muted">{post.post_author}</td>
                    <td>
                      <span className="badge bg-primary bg-opacity-10 text-primary">
                        {post.post_category}
                      </span>
                    </td>
                    <td className="text-muted text-nowrap">
                      {new Date(post.post_date).toLocaleDateString("fr-FR")}
                    </td>
                    <td>
                      <span className={`badge ${post.post_status === "publish" ? "bg-success" : "bg-warning"} bg-opacity-10 ${post.post_status === "publish" ? "text-success" : "text-warning"}`}>
                        {post.post_status === "publish" ? "Publié" : "Brouillon"}
                      </span>
                    </td>
                    <td>
                      <div className="dash-actions">
                        <button className="dash-action-btn dash-action-edit" onClick={() => openEdit(post)} title="Modifier">
                          <FiEdit2Icon size={15} />
                        </button>
                        <button className="dash-action-btn dash-action-delete" onClick={() => setConfirmDelete(post.id)} title="Supprimer">
                          <FiTrash2Icon size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <DashboardModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingPost ? "Modifier l'article" : "Nouvel article"}
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Titre</label>
            <input
              type="text"
              className="form-control"
              value={formData.post_title}
              onChange={(e) => setFormData({ ...formData, post_title: e.target.value })}
              required
            />
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Auteur</label>
              <input
                type="text"
                className="form-control"
                value={formData.post_author}
                onChange={(e) => setFormData({ ...formData, post_author: e.target.value })}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Catégorie</label>
              <input
                type="text"
                className="form-control"
                value={formData.post_category}
                onChange={(e) => setFormData({ ...formData, post_category: e.target.value })}
                required
                list="categories-list"
              />
              <datalist id="categories-list">
                {categories.map((c) => <option key={c} value={c} />)}
              </datalist>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                value={formData.post_date.split("T")[0]}
                onChange={(e) => setFormData({ ...formData, post_date: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Statut</label>
              <select
                className="form-select"
                value={formData.post_status || "publish"}
                onChange={(e) => setFormData({ ...formData, post_status: e.target.value })}
              >
                <option value="publish">Publié</option>
                <option value="draft">Brouillon</option>
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Extrait</label>
            <textarea
              className="form-control"
              rows={2}
              value={formData.post_excerpt}
              onChange={(e) => setFormData({ ...formData, post_excerpt: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contenu</label>
            <textarea
              className="form-control"
              rows={4}
              value={formData.post_content}
              onChange={(e) => setFormData({ ...formData, post_content: e.target.value })}
              required
            />
          </div>
          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-outline-secondary" onClick={() => setModalOpen(false)}>
              Annuler
            </button>
            <button type="submit" className="btn btn-primary">
              {editingPost ? "Enregistrer" : "Créer l'article"}
            </button>
          </div>
        </form>
      </DashboardModal>

      <ConfirmDialog
        isOpen={confirmDelete !== null}
        onClose={() => setConfirmDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Supprimer l'article"
        message="Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible."
      />
    </div>
  );
};
