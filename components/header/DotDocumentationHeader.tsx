import React from 'react';
import DotSearchHeader from './components/DotSearchHeader';

export const DotDocumentationHeader = (): JSX.Element => {
    return (
        <header className="header-container">
            <div className="flex justify-center items-center">
                <div className="w-2/12">
                    <span className="dotcms-letter">d</span>
                    <div className="dotcms-o" />
                    <span className="dotcms-letter">t</span>
                    <strong>CMS</strong>
                </div>
                <div className="flex w-7/12">
                    <DotSearchHeader />
                </div>
                <div className="flex justify-end items-center w-3/12">
                    <div className="flex items-center selector-version">
                        <span>Version:</span>
                        <select className="focus:outline-none">
                            <option>value</option>
                        </select>
                    </div>
                </div>
            </div>
        </header>
    );
};
