import React from 'react';
import DotSearchHeader from './components/DotSearchHeader';

export const DotDocumentationHeader = (): JSX.Element => {
    return (
        <header className="header-container">
            <div className="flex justify-items-center">
                <div className="w-3/12">
                    <span>d</span>
                    <div className="dotcms-o" />
                    <span>t</span>
                    <strong>CMS</strong>
                </div>
                <DotSearchHeader />
                <div className="flex justify-items-center w-3/12">
                    <select>
                        <option>value</option>
                    </select>
                </div>
            </div>
        </header>
    );
};
