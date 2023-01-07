import React from 'react'

type BookProps = {
    title: string
    year: number
}

type BookTableProps = {
    books: Array<BookProps>
}

export const BookTable = ({books}: BookTableProps): JSX.Element => {
    const rows = books.map(({title, year}, index: number) => (
        <tr key={index}>
            <td>{title}</td>
            <td>{year}</td>
        </tr>
    ))
    return (
        <table className='styled-table'>
            <thead>
            <tr>
                <th>Title</th>
                <th>Year</th>
            </tr>
            </thead>
            <tbody>
            {rows}
            </tbody>
        </table>
    )
}
