import {Audio, ProgressBar} from 'react-loader-spinner'

export const Loader = () => {
    return (
        <div>
            <ProgressBar
                height="80"
                width="80"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass="progress-bar-wrapper"
                borderColor = '#F4442E'
                barColor = '#51E5FF'
            />
        </div>
    )
}