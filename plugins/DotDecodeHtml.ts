import visit from 'unist-util-visit';
import { Node } from 'unist';
import { decode } from 'html-entities';

interface CustomNode extends Node {
    value: string;
    children?: CustomNode[];
}

export default function () {
    return function (node: CustomNode): void {
        visit(node, 'element', (node: CustomNode) => {
            if (node && node.tagName === 'code') {
                node.children.forEach((childNode) => {
                    childNode.value = decode(childNode.value);
                });
            }
        });
    };
}
