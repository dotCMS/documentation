const catchComments = new RegExp(/<!--(.|\n)*?-->/gi);
const preContent = new RegExp(/<pre[^>]*>(.|\n)*?<\/pre>/gi);
const emptyLines = new RegExp(/(^[ \t]*\n)/gm);

export const formatHtml = (documentation: string): string => {
    const commentsRemoved = removeCommets(documentation);
    const emptyLinesRemoved = removeEmptyLines(commentsRemoved);
    const documentationFormated = removeBrackets(emptyLinesRemoved);
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

const removeBrackets = (documentation: string) => {
    // We have to remove brackets within  the code
    // because it is exactly how a variable is pass in ReactJS
    // So, to avoid any kind of issue with mdx we have to change them
    // for them html HTML entity codes
    return documentation.replace(/{/g, '&#123;').replace(/}/g, '&#125;');
};
