(function() {

    var uc = new UpdateChart();

    uc.update();
    startInterval(uc.update, 2000);


    
    function startInterval(callback, t){
      interval = setInterval(callback, t);
    }

    function stopInterval(){
      clearInterval(interval);
    }

    function getRandomNumber(max) {
        return Math.ceil(Math.random() * max);
    }

    function getRandomData(max, len){
      var arr = [];
      for (var i=0; i<len; i++) {
        arr.push( getRandomNumber(max) );
      }
      return arr;
    }

    function UpdateChart() {

        var id = '#update',
            width = 600,
            barHeight = 20,
            max = 15;

        var x = d3.scaleLinear()
            .range([0, width]);

        var chart = d3.select(id)
            .html('')
            .attr('width', width)
            .attr('height', max * barHeight);


        this.update = function() {
            var dataLength = getRandomNumber(max);
            var data = getRandomData(50, dataLength);
            var t = 1000;

            d3.select('#updateArray').text('[' + data.join(',') + ']');

            x.domain([0, d3.max(data, function(d) {
                return d; })]);

            var bar = chart.selectAll('rect')
                .data(data);

            bar.exit()
                .transition()
                .style('fill', '#ff5a00')
                .transition()
                .delay(t)
                .remove();

            bar.enter()
                .append('rect')
                .attr('width', 0)
                .attr('height', barHeight - 1)
                .attr('x', x(0))
                .attr('y', function(d, i) {
                    return i * barHeight; });

            bar.transition()
                .attr('width', function(d) {
                    return x(d); })
                .transition()
                .delay(t)
                .style('fill', '#777');

        };

    }

    



    function ScaleChart() {

        var id = '#range',
            w = 400,
            h = 30;

        var x = d3.scale.linear()
            .domain([20, 60])
            .range([0, w]);

        var svg = d3.select(id)
            .attr('width', w)
            .attr('height', h);

        svg.append('rect')
            .style('fill', '#ddd')
            .attr('width', w)
            .attr('height', h)
            .attr('x', 0)
            .attr('y', 0);

        var bar = svg.append('rect')
            .attr('width', 0)
            .attr('height', h)
            .attr('x', 0)
            .attr('y', 0);

        var input = d3.select('#input');
        var output = d3.select('#output');

        function update(d) {
            bar.transition().attr('width', x(d));
            input.text(d);
            output.text(Math.round(x(d)));
        }

        update(40)

        d3.select('#domain').on('change', function() {
            update(this.value);
        });
    }
})();
