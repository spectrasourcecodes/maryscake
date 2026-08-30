import { useEffect, useState } from 'react'
import api from '../../services/api'
import { Search, Mail, Phone, User, Calendar, Trash2, MessageSquare } from 'lucide-react'

const AdminContacts = () => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [deleting, setDeleting] = useState(null)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const res = await api.get('/contact')
      setContacts(res.data)
    } catch (err) {
      console.error('Failed to fetch contacts', err)
    } finally {
      setLoading(false)
    }
  }

  const deleteContact = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return
    setDeleting(id)
    try {
      await api.delete(`/contact/${id}`)
      await fetchContacts()
    } catch (err) {
      console.error('Failed to delete contact', err)
    } finally {
      setDeleting(null)
    }
  }

  const filteredContacts = contacts.filter(contact => {
    const searchLower = searchTerm.toLowerCase().trim()
    if (!searchLower) return true
    const searchable = [
      contact.name,
      contact.email,
      contact.phone,
      contact.subject,
      contact.message
    ].filter(Boolean).map(field => field.toLowerCase())
    return searchable.some(field => field.includes(searchLower))
  })

  if (loading) return <div className="text-center py-12">Loading messages...</div>

  return (
    <div>
      <h1 className="heading-section text-2xl">Contact Messages</h1>
      <p className="text-neutral-500 mt-1">All messages from the contact form</p>

      {/* Search */}
      <div className="mt-4 relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search by name, email, subject..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:outline-none"
        />
      </div>

      {filteredContacts.length === 0 ? (
        <p className="text-neutral-500 mt-6">No messages found.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {filteredContacts.map(contact => (
            <div key={contact._id} className="bg-white rounded-xl shadow-soft overflow-hidden">
              <div className="flex flex-wrap items-start justify-between gap-3 p-4 border-b border-neutral-100 bg-neutral-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-neutral-500 flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {contact.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {contact.phone && (
                    <span className="text-sm text-neutral-500 flex items-center gap-1 bg-neutral-100 px-2 py-1 rounded-full">
                      <Phone className="w-3 h-3" />
                      {contact.phone}
                    </span>
                  )}
                  <span className="text-xs text-neutral-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => deleteContact(contact._id)}
                    disabled={deleting === contact._id}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-2">
                {contact.subject && (
                  <p className="font-medium text-neutral-800 flex items-center gap-1">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    {contact.subject}
                  </p>
                )}
                <p className="text-sm text-neutral-600 whitespace-pre-wrap break-words">
                  {contact.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminContacts