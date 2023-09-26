export default function Congratulations({ config, numMoves }) {
    return (
        <div className='congratulations'>
            <h1>
                Congratulations!
            </h1>
            <h2>
                You solved the {config}x{config} in {numMoves} move{numMoves == 1 ? '' : 's'}!
            </h2>
        </div >
    )
}