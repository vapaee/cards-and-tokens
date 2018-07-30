/*
export interface InventoryI {
  // API
  // 
}
export interface AlbumI {
  // API
  // 
}
*/
export interface ContainerCtrl {
  // API
  // 
}

export interface SlotI {
  loadCopy(copy:any);
  // API
  // 
}


export interface SlotMap {
  [key: string]: Slot;
}

export interface Slot {
  ctrl:SlotI,
  index?:number,
  page?:number,
  slot?:number,
  copy?:any
}
export interface Page {
  slots:Slot[],
  index?:number
}
/*
export interface Album {
  ctrl:AlbumI,
  pages:Page[],
  slots:SlotMap,
}

export interface Inventory {
  ctrl:InventoryI,
  pages:Page[],
  slots:SlotMap,
}
*/

export interface Container {
  ctrl:ContainerCtrl,
  pages:Page[],
  slots:SlotMap,
  current:number
}
