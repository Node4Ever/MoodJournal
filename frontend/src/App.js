import React from 'react';
import './App.css';

class App extends React.Component {
    // Initialize state
    state = { passwords: [] }

    // Fetch passwords after first mount
    componentDidMount() {
    }

    render() {

        return (
            <section className="App">
                <div>
                    <h1>MindStream Journal</h1>
                    <div><img src="/logo.png" title="MindStream Journal" alt="MindStream Journal" width="250" height="250" /></div>
                </div>
            </section>
        );
    }
}

export default App;
