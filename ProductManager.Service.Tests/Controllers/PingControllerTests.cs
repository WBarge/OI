using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using ProductManager.Service.Controllers;

namespace ProductManager.Service.Tests.Controllers
{

    [TestFixture, Description("Tests of the PingController")]
    public class PingControllerTests
    {
        [Test, Description("Tests the get on the controller returns a 200")]
        public async Task Get_GetRequest_IsSuccessful()
        {
            await TestContext.Out.WriteLineAsync("Setting up test");
            PingController sut = new();

            await TestContext.Out.WriteLineAsync("Executing test");
            IActionResult response = sut.Get();

            await TestContext.Out.WriteLineAsync("Examining results");
            response.Should().BeOfType<OkResult>();
        }
    }
}
