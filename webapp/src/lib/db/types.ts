export enum Mood {
  surprised,
  neutral,
  happy,
  sad,
  angry,
  fear,
}

export type MovieData = {
  id: string;
  title: string;
  type: string;
  year: string;
  image: string;
  releaseDate: string;
  runtimeMins: string;
  runtimeStr: string;
  plot: string;
  plotLocal: string;
  plotLocalIsRtl: true;
  awards: string;
  directors: string;
  directorList: [
    {
      id: string;
      name: string;
    },
  ];
  writers: string;
  writerList: [
    {
      id: string;
      name: string;
    },
  ];
  stars: string;
  starList: [
    {
      id: string;
      name: string;
    },
  ];
  actorList: [
    {
      id: string;
      image: string;
      name: string;
      asCharacter: string;
    },
  ];
  genres: string;
  genreList: [
    {
      key: string;
      value: string;
    },
  ];
  companies: string;
  companyList: [
    {
      id: string;
      name: string;
    },
  ];
  countries: string;
  countryList: [
    {
      key: string;
      value: string;
    },
  ];
  languages: string;
  languageList: [
    {
      key: string;
      value: string;
    },
  ];
  contentRating: string;
  ratings: {
    imDbId: string;
    title: string;
    fullTitle: string;
    type: string;
    year: string;
    imDb: string;
    metacritic: string;
    theMovieDb: string;
    rottenTomatoes: string;
    filmAffinity: string;
    errorMessage: string;
  };
  keywords: string;
  keywordList: string[];
  tvSeriesInfo: {
    yearEnd: string;
    creators: string;
    creatorList: [
      {
        id: string;
        name: string;
      },
    ];
    seasons: [string];
  };
  tvEpisodeInfo: {
    seriesId: string;
    seriesTitle: string;
    seriesFullTitle: string;
    seriesYear: string;
    seriesYearEnd: string;
    seasonNumber: string;
    episodeNumber: string;
    previousEpisodeId: string;
    nextEpisodeId: string;
  };
  errorMessage: string;
};

export type MovieWatchData = {
  id: string;
  watch_duration: number;
  mood: Mood;
  date: Date;
};

export type UserData = {
  name: string;
  email: string;
  watch_stats: {
    mood: Mood;
    watch_history: MovieWatchData[];
  };
  preferences: {
    genres: string[];
    languages: string[];
    share_watch_stats: boolean;
    notifications: boolean;
  };
};
