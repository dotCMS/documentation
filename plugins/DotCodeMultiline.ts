import visit from 'unist-util-visit';
import { Node } from 'unist';

interface CustomNode extends Node {
    value: string;
    children?: CustomNode[];
}

export default function () {
    return function (tree: CustomNode): void {
        visit(tree, 'jsx', (node: CustomNode) => {
            const value = node.value;
            const preContent = new RegExp(/<pre>(.|\n)*?<\/pre>/gi);
            node.value = value.replace(preContent, (match) => {
                return match.replace(/\n/g, '<br />');
            });
        });
    };
}
