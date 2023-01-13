import { AuthorProps } from '../author/author-props'

export type BookProps = {
    id: string
    title: string
    year: number
    author?: AuthorProps
}

export type BookArray = Array<BookProps>