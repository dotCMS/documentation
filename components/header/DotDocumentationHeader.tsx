import React from 'react';
import DotSearchHeader from './components/DotSearchHeader';
import DotNavHeader from './components/DotNavHeader';

export const DotDocumentationHeader = (): JSX.Element => {
    return (
        <header className="pt-4 px-6 bg-header">
            <div className="flex justify-center items-center mb-5">
                <div className="w-2/12">
                    <span className="text-4xl">d</span>
                    <div className="dotcms-o" />
                    <span className="text-4xl">t</span>
                    <strong className="text-3.5xl">CMS</strong>
                </div>
                <div className="flex w-7/12">
                    <DotSearchHeader />
                </div>
                <div className="flex justify-end items-center w-3/12">
                    <div className="flex items-center selector-version">
                        <span className="font-bold text-sm">Version:</span>
                        <select className="focus:outline-none w-1/2">
                            <option>value</option>
                        </select>
                    </div>
                </div>
            </div>
            <div>
                <DotNavHeader />
            </div>
        </header>
    );
};
