import { AuthorProps } from './author-props'

export type BookProps = {
    id: number
    title: string
    year: number
    author?: AuthorProps
}
