import Collection from 'ol/Collection'
import CollectionInput from 'ol-ext/util/input/Collection'

interface Item { title: string }
const collect = new Collection<Item>()
for (let i = 0; i < 20; i += 1) collect.push({ title: `line ${i + 1}<br/>---` })
const list = new CollectionInput({
  collection: collect,
  getTitle: item => item.title,
  target: document.querySelector<HTMLElement>('#collection')!,
})
function showPosition(position: number, item: Item | null): void {
  document.querySelector<HTMLElement>('#position')!.textContent = String(position)
  document.querySelector<HTMLElement>('#result')!.innerHTML = item?.title || ''
}
list.on('item:select', event => showPosition(event.position, event.item))
list.on('item:order', event => showPosition(event.position, event.item))
list.on('item:dblclick', event => { if (event.item) window.alert(event.item.title.replace('<br/>', ' ')) })
list.on('item:keydown', event => {
  if (event.key === 'Enter' && event.item) {
    const item = event.item
    list.select(item)
    setTimeout(() => { window.alert(item.title.replace('<br/>', ' ')) })
  }
})
Object.assign(window, { collect })
