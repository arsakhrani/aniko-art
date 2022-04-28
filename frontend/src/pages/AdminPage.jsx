import React, { useState } from "react"
import AdminCreate from "../components/sections/admin/AdminCreate"
import AdminDashboard from "../components/sections/admin/AdminDashboard"
import AdminDelete from "../components/sections/admin/AdminDelete"
import AdminEdit from "../components/sections/admin/AdminEdit"
import AdminLogin from "../components/sections/admin/AdminLogin"
import AdminCreateArt from "../components/sections/admin/AdminCreateArt"
import AdminDeleteArt from "../components/sections/admin/AdminDeleteArt"

export default function AdminPage() {
  const [task, setTask] = useState("")

  const changeTask = (value) => {
    setTask(value)
  }

  if (
    window.localStorage.getItem("admin_key") !== process.env.REACT_APP_ADMIN_KEY
  ) {
    return (
      <div>
        <AdminLogin />
      </div>
    )
  }

  if (
    window.localStorage.getItem("admin_key") === process.env.REACT_APP_ADMIN_KEY
  ) {
    return (
      <div>
        {!task && <AdminDashboard setTask={changeTask} />}
        {(task === "createArtist" ||
          task === "createGallery" ||
          task === "createPartner") && (
          <AdminCreate task={task} setTask={changeTask} />
        )}
        {(task === "editArtist" ||
          task === "editGallery" ||
          task === "editPartner") && (
          <AdminEdit task={task} setTask={changeTask} />
        )}
        {(task === "deleteArtist" ||
          task === "deleteGallery" ||
          task === "deletePartner") && (
          <AdminDelete task={task} setTask={changeTask} />
        )}
        {task === "createArtwork" && <AdminCreateArt setTask={changeTask} />}
        {task === "deleteArtwork" && <AdminDeleteArt setTask={changeTask} />}
      </div>
    )
  }
}
