import CallsList from "@/components/CallsList"

function Recordings() {
  return (
    <section className='flex flex-col gap-10 size-full text-white'>
        <h1 className='text-3xl font-bold'>Recordings</h1>
        <CallsList type='recordings' />
    </section>
  )
}

export default Recordings