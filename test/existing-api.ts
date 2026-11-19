import UndoRedo from '../@types/ol-ext/interaction/UndoRedo'
import Clip from '../@types/ol-ext/interaction/Clip'
import Transform from '../@types/ol-ext/interaction/Transform'
import FlowLine from '../@types/ol-ext/style/FlowLine'
import Compass from '../@types/ol-ext/control/Compass'

const history = new UndoRedo()
history.define<{ previous: number }>('edit', data => data.previous, data => data.previous)
history.push('edit', { previous: 1 }, 'Edit')
history.blockStart('group')
history.blockEnd()
history.setMaxLength(10)
history.setMaxSize(20)
const count: number = history.length('redo') + history.size()
history.getStack()
history.abort()
history.setMap(null)
const clip = new Clip()
const radius: number = clip.getRadius()
const position = clip.getPosition()
new Transform().setPointRadius(feature => feature ? [5, 10] : 0)
const line = new FlowLine()
line.setOffset(5, 0)
const offset: number = line.getOffset(0)
const compass = new Compass()
compass.setVisible(compass.getVisible())
void [count, radius, position, offset]
