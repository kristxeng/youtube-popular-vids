export interface YoutubeResponse {
  kine: string;
  etag: string;
  items: Array<VidItem>;
  nextPageToken?: string;
  previousPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

export interface VidItem {
  kind: string;
  etag: string;
  id: string;
  channelTitle: string;
  tags: Array<string>;
  categoryId: string;
  liveBroadcastContent: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: VidThumbnails;
  };
  localized: {
    title: string;
    description: string;
  };
  contentDetails: VidContentDetails;
}

export interface VidThumbnails {
  default: ThumbnailInfo;
  medium: ThumbnailInfo;
  high: ThumbnailInfo;
  standard: ThumbnailInfo;
  maxres: ThumbnailInfo;
}

export interface ThumbnailInfo {
  url: string;
  width: number;
  height: number;
}

export interface VidContentDetails {
  duration: string;
  dimension: string;
  definition: string;
  caption: string;
  licensedContent: boolean;
  contentRating: object;
  projection: string;
}
