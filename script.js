 function updateDateTime() {
      const now = new Date();
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      document.getElementById("dateTimeDisplay").textContent = " " + now.toLocaleString(undefined, options);
    }
    setInterval(updateDateTime, 1000);
    updateDateTime();
    // ----

    function getSuggestions(reading, type) {
      let thresholds = {
        hypoglycemia: 70,
        normalLow: 70,
        normalHigh: 99,
        prediabetesHigh: 125,
        diabetesHigh: 300
      };

      if (type === "gestational") {
        thresholds.normalLow = 70;
        thresholds.normalHigh = 95;
        thresholds.prediabetesHigh = 135;
        thresholds.diabetesHigh = 200;
      } else if (type === "type1" || type === "type2") {
        thresholds.normalLow = 80;
        thresholds.normalHigh = 130;
        thresholds.prediabetesHigh = 180;
        thresholds.diabetesHigh = 300;
      } else if (type === "prediabetes") {
        thresholds.normalLow = 70;
        thresholds.normalHigh = 99;
        thresholds.prediabetesHigh = 125;
        thresholds.diabetesHigh = 180;
      }

      if (reading < 54) {
        return {
          label: "Severe Hypoglycemia",
          color: "#dc3545",
          message: "❗ Dangerously Low! Take glucose immediately and call 911.",
          workout: "No exercise. Eat fast-acting sugar and rest.",
          food: "Drink orange juice, glucose tablets, candies."
        };
      } else if (reading < thresholds.hypoglycemia) {
        return {
          label: "Hypoglycemia",
          color: "#dc3545",
          message: "Low blood sugar. Eat something sugary and recheck in 15 mins.",
          workout: "Avoid workout until stable.",
          food: "Bananas, apples, honey water, fruit juices."
        };
      } else if (reading <= thresholds.normalHigh) {
        return {
          label: "Normal",
          color: "#198754",
          message: "Blood sugar in healthy range. Maintain balanced meals & hydration.",
          workout: type === "gestational"
            ? "🚶 Light walking after meals, pelvic tilts."
            : type === "type1"
            ? "🏋️ Light strength training and consistent cardio."
            : "🏃 Brisk walking, stretching, or cycling.",
          food: "Whole grains, leafy greens, lean proteins, fresh fruits like berries and apples."
        };
      } else if (reading <= thresholds.prediabetesHigh) {
        return {
          label: "Pre-Diabetes",
          color: "#ffc107",
          message: "Slightly high. Begin or maintain healthy habits, lower sugar intake.",
          workout: "🚶 Daily 30 min walks, basic strength exercises.",
          food: "Oats, legumes, cinnamon water, nuts, and citrus fruits."
        };
      } else if (reading <= thresholds.diabetesHigh) {
        return {
          label: "Diabetes",
          color: "#fd7e14",
          message: "High sugar level. Consult a doctor for lifestyle and medication plan.",
          workout: "🏃 Moderate cardio. Monitor sugar levels closely.",
          food: "Fiber-rich foods, nuts, berries, okra water, and avoid sugary drinks."
        };
      } else {
        return {
          label: "Severe Hyperglycemia",
          color: "#dc3545",
          message: "❗ Dangerously High! Call 911 immediately!",
          workout: "❌ No exercise. Seek emergency help.",
          food: "Drink water, avoid sugar and carbohydrates."
        };
      }
    }

function saveToLocal(data) {
      const history = JSON.parse(localStorage.getItem("sugarHistory") || "[]");
      history.unshift(data);
      localStorage.setItem("sugarHistory", JSON.stringify(history.slice(0, 100)));
    }

    
    
    function buildTable(data) {
      if(data.length === 0) return "<p>No records yet.</p>";
      return "<table><thead><tr><th>Date & Time</th><th>Reading (mg/dL)</th><th>Diabetes-Type</th><th>Status</th><th>Name</th><th>Age</th><th>Gender</th><th>City</th><th>Phone</th><th>Email</th></tr></thead><tbody>" +
        data.map(row =>
          `<tr>
            <td>${row.date}</td>
            <td>${row.reading} mg/dL</td>
            <td>${row.diabetesType}</td>  
            <td style="color:${row.color}">${row.status}</td> 
            <td>${row.name}</td>
            <td>${row.age}</td>
            <td>${row.gender}</td>
            <td>${row.city}</td>
            <td>${row.phone}</td>
            <td>${row.email}</td>
      
          </tr>`
        ).join('') + "</tbody></table>";
    }


    