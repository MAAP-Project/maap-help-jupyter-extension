import { Widget } from '@lumino/widgets';
export declare class IFrameWidget extends Widget {
    constructor(path: string);
}
export declare class ParamsPopupWidget extends Widget {
    constructor();
}
export declare class FlexiblePopupWidget extends Widget {
    constructor(text: string);
}
export declare class LimitPopupWidget extends Widget {
    constructor();
    getValue(): void;
}
export declare class AboutWidget extends Widget {
    constructor();
}
