import React, { useState } from 'react';
import { BreadcrumpComponent } from '../components/subcomponents/BreadcrumpCompont';
import { useData } from '../contexts/DataContext';
import { ArticleCardLessInfo } from '../components/subcomponents/ArticleComponentLessInfo';
import { useParams } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import ReactPaginate from 'react-paginate';
import heroImage from '../assets/images/hero-image.png';

const ArrowForward = IoIosArrowForward as any;

export const Articles: React.FC = () => {
    const { category } = useParams();
    const { posts } = useData();

    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 6;

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = posts.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(posts.length / itemsPerPage);

    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * itemsPerPage) % posts.length;
        setItemOffset(newOffset);
        window.scrollTo(0, 0);
    };

    return (
        <>
            <BreadcrumpComponent
                title='Articles et dernières nouvelles'
                subtitle='Restez informé des dernières nouvelles, événements et histoires inspirantes de notre communauté à travers nos articles et mises à jour régulières.'
                imageCover={heroImage}
            />
            <div className="wp-block-group has-global-padding is-layout-constrained wp-block-group-is-layout-constrained is-layout-container">
                {/* Header Section */}
                <div className="wp-block-columns is-layout-flex wp-block-columns-is-layout-flex">
                    <div className="wp-block-column" style={{ flexBasis: '50%' }}>
                        <h2 className="has-text-align-left has-primary-color has-text-color has-max-48-font-size wp-block-heading">
                            Articles
                        </h2>
                        <p className="has-tertiary-color has-text-color">
                            Pour ne rien manquer de nos actualités, abonnez-vous à notre newsletter.
                        </p>
                    </div>
                    <div className="wp-block-column" style={{ flexBasis: '50%' }}></div>
                </div>

                <div style={{ height: '81px' }} aria-hidden="true" className="wp-block-spacer"></div>

                {/* Query/Post Loop Section */}
                <div className="wp-block-query is-layout-flow wp-block-query-is-layout-flow">
                    <div className="row g-4 list-unstyled">
                        {posts.map(post => (
                            <ArticleCardLessInfo key={post.id} post={post} />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="d-flex justify-content-center mt-5">
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="Suivant >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            pageCount={pageCount}
                            previousLabel="< Précédent"
                            renderOnZeroPageCount={null}

                            // Classes Bootstrap pour le style
                            containerClassName="pagination"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            activeClassName="active"
                        />
                    </div>
                </div>

                <div style={{ height: '81px' }} aria-hidden="true" className="wp-block-spacer"></div>
            </div>
        </>

    );
};