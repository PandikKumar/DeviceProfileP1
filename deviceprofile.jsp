<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Device Profile Collection</title>

    <!-- FingerprintJS2 -->
   <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/fingerprintjs2/2.1.0/fingerprint2.min.js"></script> -->
    
   <!-- <script src="js/deviceProfile.js"></script> -->
     
        <!--   <script src="js/pingone-protect-device-profile-implementation.js"></script> -->
           <script src="js/signals-sdk-5.6.3.js"></script>
      <script src="js/pingone-protect-device-profiling.js"></script>
       
     <!--  <script
        src="https://apps.pingone.com/signals/web-sdk/5.6.0/signals-sdk.js"
        defer> -->
</script>
    <!-- Your existing JS file -->


    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        button {
            padding: 10px 16px;
            font-size: 14px;
            cursor: pointer;
        }
        pre {
            margin-top: 15px;
            padding: 12px;
            background: #f4f4f4;
            border-radius: 4px;
            max-height: 350px;
            overflow: auto;
        }
    </style>
</head>

<body>
    <h2>User Device / Browser Information</h2>

    <button id="collectBtn">Collect Device Info</button>

    <h3>Device Profile</h3>
    <pre id="deviceProfile">Waiting...</pre>

    <h3>Base64 Encoded Device Profile</h3>
    <pre id="encodedProfile"></pre>

    <script>
        document.getElementById("collectBtn").addEventListener("click", function () {

            profileDevice(function (components) {

                console.log("Raw Fingerprint Components:", components);

               <!-- var profileObj = transformComponentsToDeviceProfile(components); -->
<!--                var encodedProfile = encodeDeviceProfile(profileObj); -->

              <!--  document.getElementById("deviceProfile").textContent =JSON.stringify(profileObj, null, 2); -->

              <!--  document.getElementById("encodedProfile").textContent =encodedProfile; -->

               <!-- console.log("Final Device Profile:", profileObj); -->
               <!-- console.log("Encoded Profile:", encodedProfile); -->
               
               
               
               
            });

        });
    </script>
</body>
</html>
