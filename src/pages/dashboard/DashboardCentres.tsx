import React, { useState } from "react";
import { useData } from "../../contexts/DataContext";
import { truncateText } from "../../utils/utils.fucntions";
import { DashboardModal } from "../../components/dashboard/DashboardModal";
import { ConfirmDialog } from "../../components/dashboard/ConfirmDialog";
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiChevronDown, FiChevronUp } from "react-icons/fi";

const FiPlusIcon = FiPlus as any;
const FiEdit2Icon = FiEdit2 as any;
const FiTrash2Icon = FiTrash2 as any;
const FiSearchIcon = FiSearch as any;
const FiChevronDownIcon = FiChevronDown as any;
const FiChevronUpIcon = FiChevronUp as any;

interface CenterFormData {
  flug: string;
  title: string;
  description: string;
  domaineInterventions: string;
  partenaires: string;
  contacts: string;
  directionName: string;
  directionRole: string;
}

const emptyForm: CenterFormData = {
  flug: "", title: "", description: "", domaineInterventions: "",
  partenaires: "", contacts: "", directionName: "", directionRole: "",
};

export const DashboardCentres: React.FC = () => {
  const { centers, addCenter, updateCenter, deleteCenter } = useData();
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCenter, setEditingCenter] = useState<Center | null>(null);
  const [formData, setFormData] = useState<CenterFormData>(emptyForm);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filtered = centers.filter((center) =>
    center.title.toLowerCase().includes(search.toLowerCase()) ||
    center.description.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => {
    setEditingCenter(null);
    setFormData(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (center: Center, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingCenter(center);
    setFormData({
      flug: center.flug,
      title: center.title,
      description: center.description,
      domaineInterventions: center.domaineInterventions.join(", "),
      partenaires: center.partenaires?.join(", ") || "",
      contacts: center.contacts?.join(", ") || "",
      directionName: center.direction?.name || "",
      directionRole: center.direction?.role || "",
    });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const centerData: Center = {
      flug: editingCenter ? editingCenter.flug : slug,
      title: formData.title,
      description: formData.description,
      href: `/app/centres/${slug}`,
      domaineInterventions: formData.domaineInterventions.split(",").map((d) => d.trim()).filter(Boolean),
      partenaires: formData.partenaires ? formData.partenaires.split(",").map((p) => p.trim()).filter(Boolean) : [],
      contacts: formData.contacts ? formData.contacts.split(",").map((c) => c.trim()).filter(Boolean) : [],
      direction: formData.directionName ? {
        name: formData.directionName,
        role: formData.directionRole || "Directeur",
        slug: formData.directionName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        uuid: String(Date.now()),
      } : undefined,
    };
    if (editingCenter) {
      updateCenter(editingCenter.flug, centerData);
    } else {
      addCenter(centerData);
    }
    setModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (confirmDelete !== null) {
      deleteCenter(confirmDelete);
      setConfirmDelete(null);
    }
  };

  return (
    <div>
      <div className="dash-page-header">
        <div>
          <h4 className="dash-page-title">Gestion des Centres</h4>
          <p className="dash-page-subtitle">{centers.length} centres au total</p>
        </div>
        <button className="btn btn-primary dash-btn-add" onClick={openCreate}>
          <FiPlusIcon size={18} />
          <span>Nouveau centre</span>
        </button>
      </div>

      <div className="dashboard-card dash-filter-bar">
        <div className="dash-search-wrapper">
          <FiSearchIcon size={18} className="dash-search-icon" />
          <input
            type="text"
            className="form-control dash-search-input"
            placeholder="Rechercher un centre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="d-flex flex-column gap-3">
        {filtered.length === 0 ? (
          <div className="dashboard-card text-center text-muted py-4">
            Aucun centre trouvé
          </div>
        ) : (
          filtered.map((center) => {
            const isExpanded = expandedId === center.flug;
            return (
              <div key={center.flug} className="dashboard-card dash-expandable-card">
                <div
                  className="dash-expandable-header"
                  onClick={() => setExpandedId(isExpanded ? null : center.flug)}
                >
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <h6 className="mb-0">{center.title}</h6>
                      <span className="badge bg-secondary bg-opacity-10 text-secondary">
                        {center.domaineInterventions.length} domaines
                      </span>
                    </div>
                    <p className="text-muted small mb-0">
                      {isExpanded ? center.description : truncateText(center.description, 120)}
                    </p>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <button className="dash-action-btn dash-action-edit" onClick={(e) => openEdit(center, e)} title="Modifier">
                      <FiEdit2Icon size={14} />
                    </button>
                    <button className="dash-action-btn dash-action-delete" onClick={(e) => { e.stopPropagation(); setConfirmDelete(center.flug); }} title="Supprimer">
                      <FiTrash2Icon size={14} />
                    </button>
                    {isExpanded ? <FiChevronUpIcon size={18} className="text-muted" /> : <FiChevronDownIcon size={18} className="text-muted" />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="dash-expandable-content">
                    {center.direction && (
                      <div className="mb-3">
                        <strong className="small">Direction :</strong>
                        <div className="text-muted small">
                          {center.direction.name} - {center.direction.role}
                        </div>
                      </div>
                    )}
                    <div className="mb-3">
                      <strong className="small">Domaines d'intervention :</strong>
                      <div className="d-flex flex-wrap gap-1 mt-1">
                        {center.domaineInterventions.map((d, i) => (
                          <span key={i} className="badge bg-primary bg-opacity-10 text-primary">{d}</span>
                        ))}
                      </div>
                    </div>
                    {center.partenaires && center.partenaires.length > 0 && (
                      <div className="mb-3">
                        <strong className="small">Partenaires :</strong>
                        <div className="d-flex flex-wrap gap-1 mt-1">
                          {center.partenaires.map((p, i) => (
                            <span key={i} className="badge bg-info bg-opacity-10 text-info">{p}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {center.contacts && center.contacts.length > 0 && (
                      <div>
                        <strong className="small">Contacts :</strong>
                        <div className="text-muted small">{center.contacts.join(" | ")}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <DashboardModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingCenter ? "Modifier le centre" : "Nouveau centre"}
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nom du centre</label>
            <input type="text" className="form-control" value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea className="form-control" rows={3} value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Nom du directeur</label>
              <input type="text" className="form-control" value={formData.directionName}
                onChange={(e) => setFormData({ ...formData, directionName: e.target.value })} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Rôle du directeur</label>
              <input type="text" className="form-control" value={formData.directionRole}
                onChange={(e) => setFormData({ ...formData, directionRole: e.target.value })} />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Domaines d'intervention <small className="text-muted">(séparés par des virgules)</small></label>
            <input type="text" className="form-control" value={formData.domaineInterventions}
              onChange={(e) => setFormData({ ...formData, domaineInterventions: e.target.value })} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Partenaires <small className="text-muted">(séparés par des virgules)</small></label>
            <input type="text" className="form-control" value={formData.partenaires}
              onChange={(e) => setFormData({ ...formData, partenaires: e.target.value })} />
          </div>
          <div className="mb-3">
            <label className="form-label">Contacts <small className="text-muted">(séparés par des virgules)</small></label>
            <input type="text" className="form-control" value={formData.contacts}
              onChange={(e) => setFormData({ ...formData, contacts: e.target.value })} />
          </div>
          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-outline-secondary" onClick={() => setModalOpen(false)}>Annuler</button>
            <button type="submit" className="btn btn-primary">{editingCenter ? "Enregistrer" : "Créer le centre"}</button>
          </div>
        </form>
      </DashboardModal>

      <ConfirmDialog
        isOpen={confirmDelete !== null}
        onClose={() => setConfirmDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Supprimer le centre"
        message="Êtes-vous sûr de vouloir supprimer ce centre de recherche ?"
      />
    </div>
  );
};
