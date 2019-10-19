import React from 'react';
const withMessages = (WrappedComponent) => {
    class Loader extends React.PureComponent {
        render() {
            const { isLoading, error } = this.props;
            return (
                <div>
                    {isLoading && <h1>Processing...</h1>}
                    {error && <h1>{error}</h1>}
                    {!isLoading && !error && (
                        <WrappedComponent {...this.props}/>
                    )}
                </div>
            );
        }
    }

    return Loader
}

export default withMessages