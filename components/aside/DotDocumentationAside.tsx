import React from 'react';
import DotCollectionNav from './components/DotCollectionNav';
import { DotcmsDocumentation } from '@models/DotcmsDocumentation.model';

const DotDocumentationAside = ({ data }: { data: DotcmsDocumentation }): JSX.Element => {
    return (
        <div className="aside-menu-container">
            <div className="flex justify-end">
                <button className="focus:outline-none flex items-center bg-transparent z-10">
                    <i className="arrow-left" />
                </button>
            </div>
            <span className="text-sm font-bold text-purple">Overview</span>
            <nav className="aside-menu">
                <DotCollectionNav data={data} />
            </nav>
        </div>
    );
};

export default DotDocumentationAside;
