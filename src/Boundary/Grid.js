import { Group } from '../Model/Model'
import { selectGroup } from '../Controller/Controller'

export default function Grid({ config, model, update }) {

    let gridStyle = {
        display: 'grid',
        'gridTemplateColumns': `repeat(${config.numColumns},1fr)`,
        'gridTemplateRows': `repeat(${config.numRows},1fr)`,
        position: 'relative',
        height: '90%',
        width: '50%',
        left: '25%',
        zIndex: 1
    }

    let buttonGridStyle = {
        display: 'grid',
        'gridTemplateColumns': `repeat(${config.numColumns},1fr)`,
        'gridTemplateRows': `repeat(${config.numRows},1fr)`,
        position: 'relative',
        width: '50%',
        height: '90%',
        left: '-25%',
        zIndex: 2
    }

    let select = (i, j) => {
        selectGroup(model, new Group(i, j))
        update()
    }

    let buttons = []
    for (let i = 1; i < config.numColumns; i++)
    {
        for (let j = 1; j < config.numRows; j++)
        {
            buttons.push(
                <div style={{ gridColumnStart: j + 1, gridRowStart: i + 1, position: 'relative', width: 0, height: 0 }}>
                    <div data-testid="gridButtons" className={`${JSON.stringify(new Group(i, j)) === JSON.stringify(model.selectedGroup) ? 'selectedbutton' : 'button'}`} onClick={(e) => select(i, j)} />
                </div >
            )
        }
    }

    return (
        <div className='container'>
            <div className='grid' style={gridStyle}>
                {
                    model.config.map((arr, row) => {
                        return arr.map((color, col) => {
                            let style = {
                                'gridColumnStart': parseInt(col) + 1,
                                'gridRowStart': parseInt(row) + 1,
                                background: color,
                            }
                            if (col <= model.selectedGroup.j && col >= model.selectedGroup.j - 1 && row <= model.selectedGroup.i && row >= model.selectedGroup.i - 1)
                            {
                                style['border'] = '3px solid red'
                            } else
                            {
                                style['border'] = '3px solid black'
                            }
                            return (
                                <div style={style}>
                                </div>
                            )
                        })
                    })
                }
            </div>
            <div style={buttonGridStyle} className='gridButtons'>
                {buttons}
            </div>
        </div >
    )
}