const catchComments = new RegExp(/<!--(.|\n)*?-->/gi);
const preContent = new RegExp(/<pre[^>]*>(.|\n)*?<\/pre>/gi);
const emptyLines = new RegExp(/(^[ \t]*\n)/gm);

export const formatHtml = (documentation: string): string => {
    const commentsRemoved = removeCommets(documentation);
    const emptyLinesRemoved = removeEmptyLines(commentsRemoved);
    const documentationFormated = emptyLinesRemoved.replace(/{/g, '&#123;').replace(/}/g, '&#125;');
    return documentationFormated;
};

const removeCommets = (documentation: string): string => {
    // We remove html comments because
    // <!-- --> Are not allow by mdx.
    return documentation.replace(catchComments, '');
};

const removeEmptyLines = (documentation: string): string => {
    // We have to remove empty lines
    // mdx doesn't html empty lines in html files.
    // We have to be sure to no remove the empty lines inside <pre> tags
    // It's the only tag tha actually respect empty lines.
    return documentation
        .replace(preContent, (match) => match.replace(/\n/g, '<br />'))
        .replace(emptyLines, '');
};
