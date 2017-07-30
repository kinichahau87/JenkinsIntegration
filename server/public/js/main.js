$(function() {
	$("#job-name").click(function() {
		getJobDetails($(this).html());
	});
});

function getJobDetails(jobName) {
	$.ajax({
		url: "/job-detail",
		method: "GET",
		data: {
			"name": jobName
		}
	}).success(function(data) {
		$("#detail-job-name").html(data.name.toUpperCase());
		$("#detail-last-build-date").html(data.lastBuild == null ? "NEVER" : data.lastBuild);
		$("#detail-last-build-failed").html(data.lastFailedBuild == null ? "NEVER" : data.lastFailedBuild);
		$("#detail-last-build-completed").html(data.lastCompletedBuild == null ? "NEVER" : data.lastCompletedBuild);
		$("#detail-next-build").html(data.nextBuildNumber == null ? "UNKNOWN" : data.nextBuildNumber);
		$("#detail-is-buildable").html(data.buildable ? "TRUE" : "FALSE");
		$("#detail-is-inQueue").html(data.inQueue ? "TRUE" : "FALSE");
		$("#detail-upstream-projects").html(data.upstreamProjects.length);
		$("#detail-container-main").removeClass("not-visible");

		if (data.buildable) {
			$("#start-job-btn").removeClass("not-visible");
			$("#start-job-btn").click(function() {
				startJob(data.name);
			});
		}
	});
}

function startJob(jobName) {
	console.log(jobName);
	$.post("/job-start", {
		"name": jobName
	}, function(data) {
		console.log(data);
	});

}