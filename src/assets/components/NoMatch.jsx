import noMatch from '../img/404.png'

function NoMatch() {
    return (
        <div className="noMatch">
            <h1 className="noMatch__title">404</h1>
            <span className="noMatch__text">Don't worry, someday we will definitely find it...</span>
            <img src={noMatch} alt="logo" className="noMatch__img" />
        </div>
    );
}

export default NoMatch;