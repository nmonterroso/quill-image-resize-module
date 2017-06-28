import IconAlignLeft from 'quill/assets/icons/align-left.svg';
import IconAlignCenter from 'quill/assets/icons/align-center.svg';
import IconAlignRight from 'quill/assets/icons/align-right.svg';

const Parchment = window.Quill.imports.parchment;
const FloatStyle = new Parchment.Attributor.Style('float', 'float');
const MarginStyle = new Parchment.Attributor.Style('margin', 'margin');
const DisplayStyle = new Parchment.Attributor.Style('display', 'display');

const leftAlign = {
    icon: IconAlignLeft,
    apply: (el) => {
        DisplayStyle.add(el, 'inline');
        FloatStyle.add(el, 'left');
        MarginStyle.add(el, '0 1em 1em 0');
    },
    isApplied: (el) => FloatStyle.value(el) == 'left',
};

const centerAlign = {
    icon: IconAlignCenter,
    apply: (el) => {
        DisplayStyle.add(el, 'block');
        FloatStyle.remove(el);
        MarginStyle.add(el, 'auto');
    },
    isApplied: (el) => MarginStyle.value(el) == 'auto',
};

const rightAlign = {
    icon: IconAlignRight,
    apply: (el) => {
        DisplayStyle.add(el, 'inline');
        FloatStyle.add(el, 'right');
        MarginStyle.add(el, '0 0 1em 1em');
    },
    isApplied: (el) => FloatStyle.value(el) == 'right',
};

const alignments = [leftAlign, centerAlign, rightAlign];

export const getCurrentAlignment = (el) => {
    for (const alignment of alignments) {
        if (alignment.isApplied(el)) {
            return alignment;
        }
    }

    return null;
};

export const clearAlignmentStyles = (el) => {
    FloatStyle.remove(el);
    MarginStyle.remove(el);
    DisplayStyle.remove(el);
};

export default alignments;
