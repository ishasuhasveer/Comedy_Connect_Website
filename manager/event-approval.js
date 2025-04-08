import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore, collection, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function fetchEvents() {
    const querySnapshot = await getDocs(collection(db, "eventProposals"));
    const eventList = document.getElementById("event-list");
    eventList.innerHTML = "";

    querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const eventId = docSnap.id;
        eventList.innerHTML += `
            <div class="event-card p-3">
                <h4 class="text-primary">${data.eventName}</h4>
                <p><strong>Special Requests:</strong> ${data.specialRequests}</p>
                <p><strong>Timing:</strong> ${data.timing}</p>
                <p><strong>Expected Audience:</strong> ${data.expectedAudience}</p>
                <button class="btn btn-approve me-2" onclick="approveEvent('${eventId}')">Approve ✅</button>
                <button class="btn btn-reject" onclick="rejectEvent('${eventId}')">Reject ❌</button>
                <div id="rejection-reason-${eventId}" style="display:none;">
                    <p class="mt-2"><strong>Rejection Reason:</strong></p>
                    <select id="reason-${eventId}" class="form-select">
                        <option value="logistic">Logistic challenges.</option>
                        <option value="slot">Slot is already booked.</option>
                        <option value="demand">Special demands cannot be fulfilled.</option>
                    </select>
                    <button class="btn btn-primary mt-2" onclick="submitRejection('${eventId}')">Submit</button>
                </div>
            </div>
        `;
    });
}

async function approveEvent(eventId) {
    await updateDoc(doc(db, "eventProposals", eventId), { status: "Approved" });
    alert("Event Approved ✅");
    fetchEvents();
}

async function rejectEvent(eventId) {
    document.getElementById(`rejection-reason-${eventId}`).style.display = "block";
}

async function submitRejection(eventId) {
    const reason = document.getElementById(`reason-${eventId}`).value;
    await updateDoc(doc(db, "eventProposals", eventId), { status: "Rejected", rejectionReason: reason });
    alert("Event Rejected ❌");
    fetchEvents();
}

// Live Chat Functionality
window.sendMessage = function () {
    let input = document.getElementById("chat-input");
    let preset = document.getElementById("chat-preset");
    let chatBox = document.getElementById("chat-box");

    let message = preset.value || input.value.trim();

    if (message !== "") {
        let newMessage = document.createElement("div");
        newMessage.className = "chat-message manager";
        newMessage.innerHTML = `<strong>Manager:</strong> ${message}`;
        chatBox.appendChild(newMessage);
        chatBox.scrollTop = chatBox.scrollHeight;

        // Clear input fields after sending message
        input.value = "";
        preset.value = "";
    }
};

// Auto-select input field when dropdown changes
document.getElementById("chat-preset").addEventListener("change", function () {
    let inputField = document.getElementById("chat-input");
    inputField.focus();
});

window.approveEvent = approveEvent;
window.rejectEvent = rejectEvent;
window.submitRejection = submitRejection;
window.onload = fetchEvents;
