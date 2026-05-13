import React, { useState } from "react";
import { Colors } from "../../utils/utils.colors";
import { useData } from "../../contexts/DataContext";
import { DashboardModal } from "../../components/dashboard/DashboardModal";
import { ConfirmDialog } from "../../components/dashboard/ConfirmDialog";
import { FiPlus, FiEdit2, FiTrash2, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { randomNumber } from "../../utils/utils.fucntions";

const FiPlusIcon = FiPlus as any;
const FiEdit2Icon = FiEdit2 as any;
const FiTrash2Icon = FiTrash2 as any;
const FiChevronDownIcon = FiChevronDown as any;
const FiChevronUpIcon = FiChevronUp as any;

interface DomainFormData {
  domaine: string;
  faculte: string;
  filieres: string;
}

const emptyForm: DomainFormData = { domaine: "", faculte: "", filieres: "" };

export const DashboardDomaines: React.FC = () => {
  const { domainsData, addDomain, updateDomain, deleteDomain } = useData();
  const [expandedDomain, setExpandedDomain] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [formData, setFormData] = useState<DomainFormData>(emptyForm);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const totalFaculties = domainsData.reduce((acc, d) => acc + d.faculties.length, 0);
  const totalFilieres = domainsData.reduce(
    (acc, d) => acc + d.faculties.reduce((a, f) => a + f.filiaires.length, 0), 0
  );

  const openCreate = () => {
    setEditingIdx(null);
    setFormData(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const domain = domainsData[idx];
    setEditingIdx(idx);
    setFormData({
      domaine: domain.domaine,
      faculte: domain.faculties.map((f) => f.faculte).join(", "),
      filieres: domain.faculties.flatMap((f) => f.filiaires.map((fi) => fi.filiere)).join(", "),
    });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const href = "/" + formData.domaine.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const filiereNames = formData.filieres.split(",").map((f) => f.trim()).filter(Boolean);
    const domain = {
      domaine: formData.domaine,
      href,
      faculties: [{
        faculte: formData.faculte || `Faculté ${formData.domaine}`,
        href,
        filiaires: filiereNames.map((filiere) => ({
          filiere,
          profil: "",
          responsable: {
            uuid: randomNumber(),
            name: "À définir",
            role: "Doyen de la faculte",
            slug: "a-definir",
          },
          saf: {
            uuid: randomNumber(),
            name: "À définir",
            role: "Sécretaire facultaire",
            slug: "a-definir",
          },
        })),
      }],
    };
    if (editingIdx !== null) {
      updateDomain(editingIdx, domain);
    } else {
      addDomain(domain);
    }
    setModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (confirmDelete !== null) {
      deleteDomain(confirmDelete);
      setConfirmDelete(null);
      if (expandedDomain === confirmDelete) setExpandedDomain(null);
    }
  };

  return (
    <div>
      <div className="dash-page-header">
        <div>
          <h4 className="dash-page-title">Domaines & Facultés</h4>
          <p className="dash-page-subtitle">
            {domainsData.length} domaines &middot; {totalFaculties} facultés &middot; {totalFilieres} filières
          </p>
        </div>
        <button className="btn btn-primary dash-btn-add" onClick={openCreate}>
          <FiPlusIcon size={18} />
          <span>Nouveau domaine</span>
        </button>
      </div>

      <div className="d-flex flex-column gap-3">
        {domainsData.map((domain, domainIdx) => {
          const isExpanded = expandedDomain === domainIdx;
          const domainTotalFilieres = domain.faculties.reduce(
            (a, f) => a + f.filiaires.length, 0
          );

          return (
            <div key={domainIdx} className="dashboard-card dash-expandable-card">
              <div
                className="dash-expandable-header"
                onClick={() => setExpandedDomain(isExpanded ? null : domainIdx)}
              >
                <div className="d-flex align-items-center gap-3 flex-grow-1">
                  <div
                    className="dashboard-domain-indicator"
                    style={{ backgroundColor: Colors.primaryColor }}
                  />
                  <div>
                    <h6 className="mb-0">{domain.domaine}</h6>
                    <small className="text-muted">
                      {domain.faculties.length} faculté(s) &middot; {domainTotalFilieres} filière(s)
                    </small>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <button className="dash-action-btn dash-action-edit" onClick={(e) => openEdit(domainIdx, e)} title="Modifier">
                    <FiEdit2Icon size={14} />
                  </button>
                  <button className="dash-action-btn dash-action-delete" onClick={(e) => { e.stopPropagation(); setConfirmDelete(domainIdx); }} title="Supprimer">
                    <FiTrash2Icon size={14} />
                  </button>
                  {isExpanded ? <FiChevronUpIcon size={18} className="text-muted" /> : <FiChevronDownIcon size={18} className="text-muted" />}
                </div>
              </div>

              {isExpanded && (
                <div className="dash-expandable-content">
                  {domain.faculties.map((faculty, facIdx) => (
                    <div key={facIdx} className="dashboard-faculty-block">
                      <h6 className="text-primary mb-3" style={{ fontSize: "0.95rem" }}>
                        {faculty.faculte}
                      </h6>
                      <div className="table-responsive">
                        <table className="table table-sm dashboard-table">
                          <thead>
                            <tr>
                              <th>Filière</th>
                              <th>Responsable</th>
                              <th>Secrétaire facultaire</th>
                            </tr>
                          </thead>
                          <tbody>
                            {faculty.filiaires.map((filiere, filIdx) => (
                              <tr key={filIdx}>
                                <td className="fw-medium">{filiere.filiere}</td>
                                <td>
                                  <div>{filiere.responsable.name}</div>
                                  <small className="text-muted">{filiere.responsable.role}</small>
                                </td>
                                <td>
                                  <div>{filiere.saf.name}</div>
                                  <small className="text-muted">{filiere.saf.role}</small>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <DashboardModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingIdx !== null ? "Modifier le domaine" : "Nouveau domaine"}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nom du domaine</label>
            <input type="text" className="form-control" value={formData.domaine}
              onChange={(e) => setFormData({ ...formData, domaine: e.target.value })} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Nom de la faculté</label>
            <input type="text" className="form-control" value={formData.faculte}
              onChange={(e) => setFormData({ ...formData, faculte: e.target.value })}
              placeholder={`Faculté ${formData.domaine || "..."}`} />
          </div>
          <div className="mb-3">
            <label className="form-label">Filières <small className="text-muted">(séparées par des virgules)</small></label>
            <textarea className="form-control" rows={2} value={formData.filieres}
              onChange={(e) => setFormData({ ...formData, filieres: e.target.value })} required />
          </div>
          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-outline-secondary" onClick={() => setModalOpen(false)}>Annuler</button>
            <button type="submit" className="btn btn-primary">{editingIdx !== null ? "Enregistrer" : "Créer le domaine"}</button>
          </div>
        </form>
      </DashboardModal>

      <ConfirmDialog
        isOpen={confirmDelete !== null}
        onClose={() => setConfirmDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Supprimer le domaine"
        message="Êtes-vous sûr de vouloir supprimer ce domaine et toutes ses facultés ?"
      />
    </div>
  );
};
