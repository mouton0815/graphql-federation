import React, { FunctionComponent } from 'react'
import { createRoot } from 'react-dom/client'

type TestProps = {
    text: string
}

const Test : FunctionComponent<TestProps> = ({text}) => (
    <div>
        <h3>This is a test for {text}</h3>
    </div>
)

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(<Test text='Foo' />)