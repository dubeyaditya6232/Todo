import Header from './Header/Header';

function NotFound({ isDark, setIsDark }) {
    return (
        <div>
            <Header
                list={[]}
                isDark={isDark}
                setIsDark={setIsDark}
            />
            <h1>Not Found</h1>
        </div>
    )
}

export default NotFound;