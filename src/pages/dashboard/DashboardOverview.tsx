import React from "react";
import { useData } from "../../contexts/DataContext";
import { activities } from "../../utils/utils.statiquedata";
import { FiFileText, FiUsers, FiLayers, FiBookOpen, FiActivity, FiFolder, FiTrendingUp } from "react-icons/fi";
import { Link } from "react-router-dom";

const FiFileTextIcon = FiFileText as any;
const FiUsersIcon = FiUsers as any;
const FiLayersIcon = FiLayers as any;
const FiBookOpenIcon = FiBookOpen as any;
const FiActivityIcon = FiActivity as any;
const FiFolderIcon = FiFolder as any;
const FiTrendingUpIcon = FiTrendingUp as any;

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
  to?: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color, to }) => {
  const content = (
    <div className="dashboard-stat-card" style={{ borderLeftColor: color }}>
      <div className="dashboard-stat-icon" style={{ backgroundColor: color + "18", color }}>
        {icon}
      </div>
      <div className="dashboard-stat-info">
        <span className="dashboard-stat-value">{value}</span>
        <span className="dashboard-stat-label">{label}</span>
      </div>
    </div>
  );

  if (to) {
    return <Link to={to} style={{ textDecoration: "none" }}>{content}</Link>;
  }
  return content;
};

export const DashboardOverview: React.FC = () => {
  const { posts, staffMembers, centers, domainsData } = useData();

  const totalFaculties = domainsData.reduce((acc, d) => acc + d.faculties.length, 0);
  const totalFilieres = domainsData.reduce(
    (acc, d) => acc + d.faculties.reduce((a, f) => a + f.filiaires.length, 0),
    0
  );

  const recentPosts = [...posts].sort(
    (a, b) => new Date(b.post_date).getTime() - new Date(a.post_date).getTime()
  ).slice(0, 5);

  const organizerCount = staffMembers.filter((m) => m.isOrganizer).length;

  return (
    <div>
      <div className="dash-page-header mb-2">
        <div>
          <h4 className="dash-page-title">Vue d'ensemble</h4>
          <p className="dash-page-subtitle">Bienvenue sur le tableau de bord</p>
        </div>
      </div>

      <div className="dashboard-stats-grid">
        <StatCard icon={<FiFileTextIcon size={24} />} label="Articles" value={posts.length} color="#2563eb" to="/dashboard/articles" />
        <StatCard icon={<FiUsersIcon size={24} />} label="Personnel" value={staffMembers.length} color="#16a34a" to="/dashboard/staff" />
        <StatCard icon={<FiLayersIcon size={24} />} label="Centres" value={centers.length} color="#ea580c" to="/dashboard/centres" />
        <StatCard icon={<FiBookOpenIcon size={24} />} label="Domaines" value={domainsData.length} color="#9333ea" to="/dashboard/domaines" />
        <StatCard icon={<FiFolderIcon size={24} />} label="Facultés" value={totalFaculties} color="#0891b2" />
        <StatCard icon={<FiActivityIcon size={24} />} label="Activités" value={activities.length} color="#dc2626" />
      </div>

      <div className="row mt-4">
        <div className="col-lg-7 mb-4">
          <div className="dashboard-card">
            <h6 className="dashboard-card-title">Articles récents</h6>
            {recentPosts.length === 0 ? (
              <p className="text-muted text-center py-3">Aucun article</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover dashboard-table">
                  <thead>
                    <tr>
                      <th>Titre</th>
                      <th>Catégorie</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentPosts.map((post) => (
                      <tr key={post.id}>
                        <td className="fw-medium">{post.post_title}</td>
                        <td>
                          <span className="badge bg-primary bg-opacity-10 text-primary">
                            {post.post_category}
                          </span>
                        </td>
                        <td className="text-muted">
                          {new Date(post.post_date).toLocaleDateString("fr-FR")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="col-lg-5 mb-4">
          <div className="dashboard-card">
            <h6 className="dashboard-card-title">Filières par domaine</h6>
            <div className="dashboard-domain-list">
              {domainsData.map((domain, idx) => {
                const filCount = domain.faculties.reduce(
                  (a, f) => a + f.filiaires.length, 0
                );
                return (
                  <div key={idx} className="dashboard-domain-item">
                    <div className="dashboard-domain-name">{domain.domaine}</div>
                    <div className="d-flex align-items-center gap-2">
                      <span className="badge bg-secondary bg-opacity-10 text-secondary">
                        {domain.faculties.length} fac.
                      </span>
                      <span className="badge bg-primary bg-opacity-10 text-primary">
                        {filCount} fil.
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="dashboard-card mt-3">
            <h6 className="dashboard-card-title">
              <FiTrendingUpIcon size={16} className="me-2" />
              Statistiques rapides
            </h6>
            <div className="d-flex flex-column gap-2">
              <div className="d-flex justify-content-between">
                <span className="text-muted small">Total filières</span>
                <strong className="small">{totalFilieres}</strong>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-muted small">Total facultés</span>
                <strong className="small">{totalFaculties}</strong>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-muted small">Membres organisateurs</span>
                <strong className="small">{organizerCount}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
