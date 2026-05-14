import React from 'react';
import { BreadcrumpComponent } from '../components/subcomponents/BreadcrumpCompont';
import { Colors } from '../utils/utils.colors';
import { LuChevronRight } from 'react-icons/lu';
import heroImage from '../assets/images/hero-image.png';
import { FAQItem } from '../components/subcomponents/Faqitem';
import { useData } from '../contexts/DataContext';

const LuChevronRightIcon = LuChevronRight as any;

export const Faq: React.FC = () => {
    const { faqs } = useData();

    return (
        <>
            <BreadcrumpComponent
                imageCover={heroImage}
                subtitle={"Retrouvez ici les réponses aux questions les plus fréquemment posées sur l'ULPGL, nos services et notre engagement envers la durabilité."}
                title={<span style={{ color: Colors.whiteColor }}>FAQ <LuChevronRightIcon size={14} /> Foire aux questions </span>}
            />
            <div style={{ height: '81px' }} aria-hidden="true" className="wp-block-spacer"></div>
            <div className="is-layout-container">
                <div className="wp-block-group has-global-padding is-layout-constrained wp-block-group-is-layout-constrained">
                    {/* Header Section */}
                    <div className="wp-block-columns is-layout-flex wp-block-columns-is-layout-flex">
                        <div className="wp-block-column" style={{ flexBasis: '50%' }}>
                            <h2 className="has-text-align-left has-primary-color has-text-color has-max-48-font-size wp-block-heading">
                                FAQ
                            </h2>
                            <p className="has-tertiary-color has-text-color">
                                Vous ne trouvez pas votre réponse ? N'hésitez pas à contacter notre service d'orientation via la page Contacts.
                            </p>
                        </div>
                        <div className="wp-block-column" style={{ flexBasis: '50%' }}></div>
                    </div>

                    <div style={{ height: '81px' }} aria-hidden="true" className="wp-block-spacer"></div>

                    <div className="wp-block-query is-layout-flow wp-block-query-is-layout-flow">
                        {faqs.map((faq, index) => (
                            <FAQItem
                                key={index}
                                number={faq.number}
                                question={faq.question}
                                answer={faq.answer}
                            />
                        ))}
                    </div>

                    <div style={{ height: '81px' }} aria-hidden="true" className="wp-block-spacer"></div>
                </div>
            </div>
        </>
    )
}