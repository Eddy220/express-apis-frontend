document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("http://localhost:8080/tweets", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "TWITTER_LITE_ACCESS_TOKEN"
        )}`,
      }
    });

    if (res.status === 401) {
      window.location.href = "/log-in";
      return;
    }

    const { tweets } = await res.json();

    const tweetsContainer = document.querySelector("#tweets-container");
    const tweetsHtml = tweets.map(
      ({ message }) => `
      <div class="card">
        <div class="card-body">
          <p class="card-text">${message}</p>
        </div>
      </div>
    `
    );
    tweetsContainer.innerHTML = tweetsHtml.join("");
  } catch (e) {
    console.error(e);
  }
});
