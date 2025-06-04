// app/admin/page.tsx
export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-1/5 bg-gray-100 p-6 border-r">
        <h2 className="text-xl font-bold mb-6">YT Learn Admin</h2>
        <nav className="flex flex-col gap-4 text-sm font-medium">
          <a href="/admin" className="hover:text-blue-600">
            🏠 Dashboard
          </a>
          <a href="/admin/add-topic" className="hover:text-blue-600">
            ➕ Add Topic
          </a>
          <a href="/admin/add-video" className="hover:text-blue-600">
            🎥 Add Video
          </a>
          <a href="/admin/manage" className="hover:text-blue-600">
            🗂️ Manage Content
          </a>
          <a href="/logout" className="text-red-600 mt-8">
            🚪 Logout
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-6">📊 Dashboard Overview</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="bg-white shadow rounded-xl p-5">
            <h2 className="text-gray-500">Total Topics</h2>
            <p className="text-3xl font-bold text-blue-600">14</p>
          </div>
          <div className="bg-white shadow rounded-xl p-5">
            <h2 className="text-gray-500">Total Videos</h2>
            <p className="text-3xl font-bold text-green-600">48</p>
          </div>
          <div className="bg-white shadow rounded-xl p-5">
            <h2 className="text-gray-500">Unique Channels</h2>
            <p className="text-3xl font-bold text-purple-600">12</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-semibold mb-4">📝 Recent Activity</h2>
          <ul className="space-y-3">
            <li className="bg-gray-50 p-4 rounded shadow">
              ✅ Added video <b>“HTML in 9 Minutes”</b> to topic <i>HTML</i>
            </li>
            <li className="bg-gray-50 p-4 rounded shadow">
              🔄 Updated topic <b>React JS</b>
            </li>
            <li className="bg-gray-50 p-4 rounded shadow">
              🗑️ Deleted video from topic <b>NodeJS</b>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
