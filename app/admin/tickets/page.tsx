import React from 'react'
import TicketList from '@/components/tickets/TicketList';

const AdminTicketsPage = () => {
  return (
    <div>
			<h1>Support Tickets Admin</h1>
            <p>Admin support desk</p>
			<h2>Open</h2>
			<TicketList status="Open" />
			<h2>Pending</h2>
			<TicketList status="Pending" />
			<h2>Closed</h2>
			<TicketList status="Closed" />
		</div>
  )
}

export default AdminTicketsPage