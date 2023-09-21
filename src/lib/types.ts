export interface GalleryItem {
    contentTypeId: "gallery";
    fields: {
        image: {
            fields: {
                file: {
                    url: string | undefined;
                    title: string;
                };
            };
        };
    };
}