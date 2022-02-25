import visit from 'unist-util-visit';
import { Node } from 'unist';
import download from 'image-downloader';

interface CustomNode extends Node {
    value: string;
    children?: CustomNode[];
}

export default function () {
    return async function (tree: CustomNode): Promise<void> {
        visit(tree, 'image', (node: CustomNode) => {
            const options = {
                url: node.url,
                dest: '../../public/diagram1.png' // will be saved to /path/to/dest/image.jpg
            };

            download
                .image(options)
                .then(({ filename }) => {
                    console.log('Saved to', filename); // saved to /path/to/dest/image.jpg
                })
                .catch((err) => console.error(err));

            node.url = '/diagram1.png';

        });
    };
}
