const router = {
  navigate: jest.fn().mockImplementation(
      (link: string)=> new Promise((resolve=> resolve(link)))
  )
}

const Modal = jest.fn().mockImplementation(()=>{
  return {open: jest.fn()}
})

export {router, Modal}