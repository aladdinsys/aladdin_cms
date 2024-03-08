export type ElasticSearchMethod =
    | Bool
    | Term
    | Match
    | Range
    ;

export type ElasticQuery<ElasticSearchMethod> = {
    query: ElasticSearchMethod
}

export type Bool = {
    bool: {
        must?: ElasticSearchMethod[],
        filter?: ElasticSearchMethod[]
        should?: ElasticSearchMethod[]
    }
}

export type Term = {
    term: {
        [key: string]: any
    }
}
export type Match = {
    match: {
        [key: string]: any
    }
}

export type Range = {
    range: {
        field_name: {
            gte?: string,
            lte?: string,
            gt?: string,
            lt?: string
        }
    }
}

export type ElasticResponse = {
    hits: {
        hits: ElasticSurveyHit[]
    }
}

export type ElasticSurveyHit = {
    _index: string,
    _id: string,
    _score: number,
    _source: {
        surveyId: string
        sections: ElasticSection
    }
}

type ElasticSection = {
    [key: string]: ElasticQuestion
}

type ElasticQuestion = {
    [key: string]: any
}