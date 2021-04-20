import visit from 'unist-util-visit';
import { transform } from 'h2x-core';
import jsx from 'h2x-plugin-jsx';

export default function () {
    return function (node): void {
        visit(node, 'jsx', (node) => {
            if (node && node.type === 'jsx') {
                const value = node.value as string;
                const data = value.replace(value, (match) => {
                    return transform(match, { plugins: [jsx] });
                });
                node.value = data;
            }
        });
    };
}
