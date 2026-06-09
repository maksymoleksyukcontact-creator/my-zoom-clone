import CallsList from "@/components/CallsList"

function Upcoming() {
  return (
    <section className='flex flex-col gap-10 size-full text-white'>
        <h1 className='text-3xl font-bold'>Upcoming</h1>
        <CallsList type="upcoming" />
    </section>
  )
}

export default Upcoming