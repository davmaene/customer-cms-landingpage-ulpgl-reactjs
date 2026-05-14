import React from 'react';
import { BreadcrumbArticle } from '../components/subcomponents/BreadcrumpArticle';
import { useParams } from 'react-router-dom';
import { SocialShare } from '../components/subcomponents/Sharesocial';
import { useData } from '../contexts/DataContext';
import { truncateText } from '../utils/utils.fucntions';

export const ArticleDerails: React.FC = () => {
    const { article } = useParams()
    const { posts, categoriesArticles } = useData();
    const [articleItem, setArticle] = React.useState<Post | null>(null);

    React.useEffect(() => {
        if (posts.length > 0 && article) {
            const found = posts.find(p => p.post_name === article);
            setArticle(found || posts[0]);
        }
    }, [posts, article]);

    if (!articleItem) {
        return <div className="container py-5 text-center"><div className="spinner-border" role="status"><span className="visually-hidden">Chargement...</span></div></div>;
    }

    return (
        <div className="container py-5">
            {/* Header de l'article */}
            <header className="mb-5">
                <BreadcrumbArticle
                    category={articleItem?.post_category ?? ""}
                    post_title={truncateText(articleItem?.post_title ?? "", 50)}
                />
                <h1 className="display-5 fw-bold">{articleItem?.post_title ?? ""}</h1>

                <div className="post-meta d-flex align-items-center text-muted small mt-3">
                    <span>{articleItem?.post_author ?? ""}</span>
                    <span className="mx-2">·</span>
                    <span className="text-primary text-uppercase fw-bold">{articleItem?.post_category ?? ""}</span>
                    <span className="mx-2">·</span>
                    <time dateTime={articleItem?.post_date_gmt ?? ""}>{articleItem?.post_date ?? ""}</time>
                </div>
                <hr className="my-4" style={{ opacity: 0.1 }} />
            </header>

            <div className="row">
                <aside className="col-md-4 pe-md-5">
                    <SocialShare
                        post_name={article ?? ""}
                    />

                    <div className="mt-5 pt-5">
                        <h2 className="h4 fw-bold mb-3">Autres catégories</h2>
                        <hr className="mb-3" />
                        <ul className="list-unstyled">
                            {categoriesArticles.map((category, idx) => (
                                <li key={idx} className="mb-2"><a href={category.href} className="text-decoration-none text-dark">{category.name}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-5">
                        <h2 className="h4 fw-bold mb-3">Tags</h2>
                        <div className="d-flex flex-wrap gap-2">
                            <span className="badge border text-secondary fw-normal">design</span>
                            <span className="badge border text-secondary fw-normal">interior</span>
                            <span className="badge border text-secondary fw-normal">minimal</span>
                        </div>
                    </div>
                </aside>

                {/* Corps de l'article - 66% */}
                <main className="col-md-8">
                    <article className="entry-content">
                        <div
                            className="prose lead-"
                            dangerouslySetInnerHTML={{ __html: articleItem?.post_content ?? "" }}
                        />
                        {/* <p className="lead">
                            {articleItem?.post_content ?? ""}
                        </p> */}
                        {/* Galerie d'images (Mosaïque simple avec Bootstrap) */}
                        <div className="row g-3 my-4">
                            {articleItem?.post_attached_images?.map((image, idx) => (
                                <div className="col-6 col-md-4">
                                    <img src={image} className="img-fluid rounded" alt="Gallery" />
                                </div>
                            ))}
                        </div>
                    </article>
                </main>
            </div>
        </div>
    );
};