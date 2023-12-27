import Swal from "sweetalert2"

export const workingprogress = () => {
    return Swal.fire({
        icon: 'success',
        title: "Working Progress",
        text: "Please Wait.. We will complete this Soon..Thank Your For Your Patient!",
        timer: 2000,
        showConfirmButton: true,
    })
}