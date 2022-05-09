export const Info = ({average, maximum,minimum, className})=>{
        return (
            <div className={`${className}`}>
              <p>{`Average ${average}`}</p>
              <p>{`Maximum ${maximum}`}</p>
              <p>{`Minimum ${minimum}`}</p>
            </div>

    

}
